const resolve = async (promise) => {
    const resolved = {
      data: null,
      error: null,
      errorMessage: null,
    };
  
    try {
      resolved.data = await promise;
    } catch(e) {
      console.log('resole ', e);
      resolved.error = e;
      resolved.errorMessage = typeof e.response.data.message === 'string' ? e.response.data.message : "Internal error";
    }
  
    return resolved;
}

export default resolve;