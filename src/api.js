const BASE_URL = process.env.REACT_APP_API_URL || "https://team5555-womenline-final.onrender.com";

// Helper for fetch with JSON
async function apiFetch(path, { method = 'GET', body, token, headers = {}, ...rest } = {}) {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  };
  if (body) opts.body = JSON.stringify(body);
  if (token) opts.headers['Authorization'] = `Bearer ${token}`;
  
  try {
    const res = await fetch(BASE_URL + path, opts);
    const contentType = res.headers.get('content-type');
    
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || `HTTP ${res.status}: ${res.statusText}`);
    }
    
    if (contentType && contentType.includes('application/json')) {
      return res.json();
    }
    return res.text();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Auth APIs
export function register(data) {
  return apiFetch('/api/auth/register', { 
    method: 'POST', 
    body: {
      username: data.username || `${data.firstName}${data.lastName}`,
      email: data.email,
      password: data.password
    } 
  });
}

export function login(data) {
  return apiFetch('/api/auth/login', { 
    method: 'POST', 
    body: {
      email: data.email,
      password: data.password
    } 
  });
}

// Journals APIs
export function getJournals(token) {
  return apiFetch('/api/journals', { method: 'GET', token });
}

export function createJournal(data, token) {
  return apiFetch('/api/journals', { 
    method: 'POST', 
    body: {
      mood: data.mood,
      note: data.note,
      periodDay: data.periodDay
    }, 
    token 
  });
}

// File upload
export async function uploadFile(file, token) {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const res = await fetch(BASE_URL + '/api/upload/file', {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || `Upload failed: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Upload Error:', error);
    throw error;
  }
}

// Period Tracker APIs - Using journals as temporary solution
export function createPeriodLog(data, token) {
  return apiFetch('/api/journals', { 
    method: 'POST', 
    body: {
      mood: data.mood,
      note: data.notes || 'Period log entry',
      periodDay: 'period-day'
    }, 
    token 
  });
}

export function getPeriodLogs(token) {
  return apiFetch('/api/journals', { method: 'GET', token });
}

// Rewards APIs
export function getRewards(token) {
  return apiFetch('/api/rewards', { method: 'GET', token });
}

export function redeemReward(data, token) {
  return apiFetch('/api/rewards/redeem', { 
    method: 'POST', 
    body: {
      rewardId: data.rewardId,
      cost: data.cost
    }, 
    token 
  });
}

export function getUserCredits(token) {
  return apiFetch('/api/user-credits', { method: 'GET', token });
}

export function earnCredits(data, token) {
  return apiFetch('/api/earn-credits', { 
    method: 'POST', 
    body: {
      activityType: data.activityType,
      source: data.source
    }, 
    token 
  });
}

// PDF Generation API
export function getSamplePdf(token) {
  return apiFetch('/api/pdf/sample', { method: 'GET', token });
} 