// API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

// Cache interface
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Cache storage
const cache = new Map<string, CacheEntry<any>>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Request queue interface
interface QueuedRequest {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  url: string;
  options: RequestInit;
  timestamp: number;
}

// Request queue and concurrency control
const MAX_CONCURRENT_REQUESTS = 5;
let activeRequests = 0;
const requestQueue: QueuedRequest[] = [];

// Process the next request in the queue
const processQueue = () => {
  // Remove any requests that have been in the queue too long (5 minutes)
  const now = Date.now();
  while (requestQueue.length > 0 && 
         now - requestQueue[0].timestamp > 5 * 60 * 1000) {
    const expired = requestQueue.shift();
    expired?.reject(new Error('Request timed out in queue'));
  }

  // Start new requests if we're under the limit
  while (activeRequests < MAX_CONCURRENT_REQUESTS && requestQueue.length > 0) {
    const { resolve, reject, url, options } = requestQueue.shift()!;
    activeRequests++;
    
    const processRequest = async () => {
      try {
        const response = await fetch(url, options);
        resolve(response);
      } catch (error) {
        reject(error);
      } finally {
        activeRequests--;
        processQueue();
      }
    };
    
    processRequest();
  }
};

// Active requests map to prevent duplicate requests
const pendingRequests = new Map<string, Promise<any>>();

// Helper function to generate a cache key
const getCacheKey = (url: string, options: RequestInit): string => {
  return `${options.method || 'GET'}:${url}:${JSON.stringify(options.body || {})}`;
};

// Helper function to add timestamp to URL to prevent caching
const addTimestamp = (url: string, force = false): string => {
  if (!force && (url.includes('_t=') || url.includes('cache=false'))) {
    return url;
  }
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}_t=${Date.now()}`;
};

// Request interceptor
const requestInterceptor = async (url: string, options: RequestInit) => {
  const method = options.method || 'GET';
  const cacheKey = getCacheKey(url, options);
  
  // Check cache for GET requests
  if (method === 'GET') {
    const cacheEntry = cache.get(cacheKey);
    if (cacheEntry && (Date.now() - cacheEntry.timestamp < CACHE_TTL)) {
      console.log(`[API] Cache hit: ${method} ${url}`);
      return { cached: true, data: cacheEntry.data };
    }
    
    // Check for active request
    if (pendingRequests.has(cacheKey)) {
      console.log(`[API] Request already in progress: ${method} ${url}`);
      return { cached: true, promise: pendingRequests.get(cacheKey) };
    }
  }
  
  console.log(`[API] ${method} ${url}`);
  
  // Add timestamp to prevent caching for GET requests
  const finalUrl = method === 'GET' ? addTimestamp(url) : url;
    
  return { url: finalUrl, options, cacheKey };
};

// Response interceptor
const responseInterceptor = async <T>(response: Response): Promise<{ data: T }> => {
  if (!response.ok) {
    const errorData = await response.text().catch(() => ({}));
    throw new Error(
      `API Error: ${response.status} - ${response.statusText}\n${JSON.stringify(errorData)}`
    );
  }
  
  // Handle empty responses
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return { data: {} as T };
  }
  
  const data = await response.json();
  return { data };
};

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Helper function to handle API requests with retry mechanism and caching
async function apiRequest<T>(
  url: string, 
  options: RequestInit = {},
  retryCount = 0
): Promise<{ data?: T; error?: string; fromCache?: boolean }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
  
  try {
    // Generate cache key
    const cacheKey = getCacheKey(url, options);
    
    // Check cache first for GET requests
    if (options.method === 'GET' || !options.method) {
      const cached = cache.get(cacheKey);
      if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        return { data: cached.data as T, fromCache: true };
      }
      
      // Check for pending request
      const pendingRequest = pendingRequests.get(cacheKey);
      if (pendingRequest) {
        return pendingRequest as Promise<{ data: T; fromCache: boolean }>;
      }
    }
    
    // Create a new request promise
    const requestPromise = (async () => {
      try {
        console.log(`[API] Fetching: ${url}`);
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers,
          },
          mode: 'cors',
          // Don't use credentials for now as it can cause CORS issues
          credentials: 'omit',
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        
        // Cache the response for GET requests
        if ((options.method === 'GET' || !options.method) && cacheKey) {
          cache.set(cacheKey, {
            data,
            timestamp: Date.now()
          });
        }
        
        return { data, fromCache: false };
      } catch (error) {
        clearTimeout(timeoutId);
        console.error(`[API] Error fetching ${url}:`, error);
        
        // Only retry on network errors and 5xx status codes
        const shouldRetry = 
          error instanceof TypeError || // Network error
          (error instanceof Error && error.message.includes('Failed to fetch')) ||
          (error instanceof Error && error.message.includes('Network request failed')) ||
          (error instanceof Error && error.message.includes('ECONNREFUSED'));

        if (shouldRetry && retryCount < MAX_RETRIES) {
          const nextRetry = retryCount + 1;
          const delayMs = RETRY_DELAY * Math.pow(2, nextRetry - 1);
          
          console.warn(`[API] Retry ${nextRetry}/${MAX_RETRIES} after ${delayMs}ms`, {
            url,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          
          await delay(delayMs);
          return apiRequest<T>(url, options, nextRetry);
        }
        
        throw error;
      } finally {
        if (cacheKey) {
          pendingRequests.delete(cacheKey);
        }
      }
    })();
    
    // Store the promise in pending requests
    if (cacheKey) {
      pendingRequests.set(cacheKey, requestPromise);
    }
    
    return await requestPromise;
    
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to fetch data';
      
    console.error(`[API] Request Failed: ${errorMessage}`, {
      url,
      method: options.method || 'GET',
      error,
      retryCount
    });
    
    return { error: errorMessage };
  }
}

// ... rest of the file ... 