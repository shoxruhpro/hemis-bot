import SessionData from "../interfaces/session-data";

function initial(): SessionData {
  return {
    document_id: null,
    token: null,
  };
}

export default initial;
