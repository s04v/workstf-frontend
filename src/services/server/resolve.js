const resolve = async (promise) => {
    const resolved = {
      data: null,
      error: null,
      errorMessage: null,
    };
  
    try {
      const res = await promise;
      resolved.data = res;
      console.log('resolved',resolved);
    } catch(e) {
      console.log('e',e);
      resolved.error = e;
      resolved.errorMessage = typeof e.response.data.message === 'string' ? e.response.data.message : "Internal error";
    }
  
    return resolved;
}

export default resolve;