import SessionData from "../interfaces/session-data";

function initial(): SessionData {
  return {
    document_id: null,
    // token:
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2MVwvYXV0aFwvbG9naW4iLCJhdWQiOiJ2MVwvYXV0aFwvbG9naW4iLCJleHAiOjE2OTMxMTgwNDQsImp0aSI6IjM3OTIyMTEwMDQ0NyIsInN1YiI6IjU5MzgifQ.KjxVK690FiRc3R77bBxj0bW42pX0e9Fhf39CErrlLLw",
    token: null,
  };
}

export default initial;
