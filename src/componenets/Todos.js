import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap'
import TodosTable from './TodosTable';


const Todos = (props) => {
    return (
        <Tabs defaultActiveKey="undone" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="undone" title="Yet to do">
                <TodosTable todos={props.todos.filter(todo => !todo.completed)} />
            </Tab>
            <Tab eventKey="done" title="Done" >
                <TodosTable todos={props.todos.filter(todo => todo.completed)} />
            </Tab>
        </Tabs>

    );
}
const mapStoreToProps = store => ({ todos: store.todos })

export default connect(mapStoreToProps, {})(Todos);

