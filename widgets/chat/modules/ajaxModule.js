import initialState from './initialState';

const BEGIN_AJAX_CALL = 'BEGIN_AJAX_CALL';
const END_AJAX_CALL = 'END_AJAX_CALL';

const actionTypeEndsInSuccess = (type) => {
  return type.length >= 8 && type.substring(type.length - 8) === '_SUCCESS';
};

const actionTypeEndsInFail = (type) => {
  return type.substring(type.length - 5) === '_FAIL';
};

export default (state = initialState.ajaxModule, action) => {
  if (action.type === BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (action.type === END_AJAX_CALL || actionTypeEndsInSuccess(action.type) ||
    actionTypeEndsInFail(action.type)) {
    return state - 1;
  }
  return state;
};

export const beginAjaxCall = () => {
  return {type: BEGIN_AJAX_CALL};
};

export const endAjaxCall = () => {
  return {type: END_AJAX_CALL};
};
