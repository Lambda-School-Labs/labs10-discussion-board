import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Categories } from '../components/index.js';

import { getCategories } from '../store/actions/index.js';

const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

class CategoriesList extends Component {
	state = {
		order: '', // possible values: 'name', 'discussion_count', 'created_at'
		orderType: '', // possible values: 'asc', 'desc'
    };
    handleSelectChange = e => this.setState({ [e.target.name]: e.target.value }, () => {
		return this.props.getCategories(this.state.order, this.state.orderType);
	});
    componentDidMount = () => this.props.getCategories(this.state.order, this.state.orderType);
    render() {
        const { categories } = this.props;
        const { order } = this.state;
        return(
            <CategoryWrapper>
                <span>Sort by: </span>
				<select onChange = { this.handleSelectChange } name = 'order'>
					<option value = 'name'>Name</option>
					<option value = 'discussion_count'>Discussions</option>
					<option value = 'created_at'>Date</option>
				</select>
				<select onChange = { this.handleSelectChange } name = 'orderType'>
                    <option value = 'asc'>
						{ order === 'created_at' ? 'Least Recent First' : 'Least First' }
					</option>
                    <option value = 'desc'>
						{ order === 'created_at' ? 'Most Recent First' : 'Greatest First' }
					</option>
				</select>
                {
                    categories.map((category, index) => 
                    <Categories 
                        key = {index} 
                        category = {category}
                    />)
                }
            </CategoryWrapper>
        )
    }
}

const mapStateToProps = state => ({
	categories: state.categories.categories,
});

export default connect(mapStateToProps, { getCategories })(CategoriesList);
