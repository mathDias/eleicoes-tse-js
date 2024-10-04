import TseAPI from "./modules/tseApi";
declare global {
    interface Window {
        _tseAPI: any;
    }
}
const initialComands: Commands =
  window._tseAPI !== undefined && Array.isArray(window._tseAPI.cmd)
    ? window._tseAPI.cmd
    : [];
window._tseAPI = new TseAPI();
if (initialComands.length) {
    initialComands.map((e, index) => {
      e();
      window._tseAPI.cmd.splice(index, 1);
      return e;
    });
}