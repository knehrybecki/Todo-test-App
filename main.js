import './style/style.sass'
import './style/reset.css'
// import $ from 'jquery'
import { v4 as uuidv4 } from 'uuid'

const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( '<!DOCTYPE html><html><head></head><body></body></html>' );
const $ = require("jquery")(window);

const inputText = $('.input-text')
const buttonAddTodo = $('.add-item')
const todoList = $('.todo__list')
const filtrAll = $('.filtr-all')
const filtrTodo = $('.filtr-todo')
const filtrDone = $('.filtr-done')

export const todoArray = new Map()

export const createNewTodo = text => {   
    const todo = $('<li>', {
        class: 'todo__item',
        text,
        'data-id': uuidv4()
    })

    return todo
}

const addTodo = () => {
    if (inputText.val() === '') {
        alert('Please write any text')

        return
    }

    const newTodo = createNewTodo(inputText.val())

    newTodo.appendTo(todoList)
    createTodoControls(newTodo)

    todoArray.set(newTodo.attr('data-id'), {
        isDone: false,
        text: inputText.val()
    })

    inputText.val(null)
}

buttonAddTodo.click(addTodo)

inputText.keyup(event => {
    if (event.keyCode === 13) {
        addTodo()
    }
})

export const createTodoControls = todoItem => {
    const allButton = $('<div>', {class: 'todo__item-all-button'})
        .appendTo(todoItem)
    const acceptedButton = $('<button>', {class: 'todo__item-accepted'})
        .appendTo(allButton)
    const deleteButton = $('<button>', {class: 'todo__item-deleted'})
        .appendTo(allButton)

    $('<i>', {class: 'fa-solid fa-check'})
        .appendTo(acceptedButton)
    $('<i>', {class: 'fa-solid fa-trash'})
        .appendTo(deleteButton)

    deleteButton.click(event => {
        $(event.target)
            .closest('li')
            .remove()

        const id = $(event.target)
            .closest('li')
            .attr('data-id')

        todoArray.delete(id)
    })
     acceptedButton.click(event => {
        $(event.target)
            .closest('li')
            .addClass('checked')

         const id = $(event.target)
             .closest('li')
             .attr('data-id')

         todoArray.get(id).isDone = true
     })
}

const filters = () => {
    filtrAll.click(() => { 
        $('.todo__item').show(500) 
    })
    filtrTodo.click(() => { 
        $('.todo__item').show(500)
        $('.todo__item.checked').hide(400)
    })
    filtrDone.click(() => {     
        $('.todo__item').hide(400)
        $('.todo__item.checked').show(500)
    })
}

filters()
