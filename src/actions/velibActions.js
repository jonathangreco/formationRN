import * as types from '../actions/velibTypes';

export function addToBookmark(velib)
{
  return {type: types.VELIB_BOOKMARKED, payload: velib}
}

export function removeFromBookmark(id)
{
  return {type: types.VELIB_UNBOOKMARKED, payload: id}
}
