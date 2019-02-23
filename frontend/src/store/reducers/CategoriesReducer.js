import {
	GET_CATEGORIES_LOADING,
	GET_CATEGORIES_SUCCESS,
	GET_CATEGORIES_FAILURE,

	ADD_CATEGORY_LOADING,
	ADD_CATEGORY_SUCCESS,
	ADD_CATEGORY_FAILURE,
} from '../actions/index.js';

const initialState = {
	categories: [],
};

export const CategoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CATEGORIES_SUCCESS:
			return {
				...state,
				categories: action.payload,
			};

		case ADD_CATEGORY_LOADING:
		case ADD_CATEGORY_SUCCESS:
		case ADD_CATEGORY_FAILURE:
		case GET_CATEGORIES_LOADING:
		case GET_CATEGORIES_FAILURE:
		default:
		return state;
	}
};
