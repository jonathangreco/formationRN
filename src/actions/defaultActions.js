import * as types from '../actions/defaultTypes';

export function acceptCgu(bool)
{
  return {type: types.CGU_ACCEPTED, payload: bool}
}
