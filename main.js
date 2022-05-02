import './style/style.sass'
import './style/reset.css'
import $ from 'jquery'
import { v4 as uuidv4 } from 'uuid'

const buttonAddTodo = $('.add-item')
const filtrAll = $('.filtr-all')
const filtrTodo = $('.filtr-todo')
const filtrDone = $('.filtr-done')

export const todoMap = new Map()

export const createNewTodo = text => {
    const todo = $('<li>', {
        class: 'todo__item',
        text,
        'data-id': uuidv4()
    })

    return todo
}

export const addTodo = () => {
    const inputText = $('.input-text')

    if (inputText.val() === '') return

    const newTodo = createNewTodo(inputText.val())

    newTodo.appendTo($('.todo__list'))
    createTodoControls(newTodo)

    todoMap.set(newTodo.attr('data-id'), {
        isDone: false,
        text: inputText.val()
    })

    inputText.val(null)
}

buttonAddTodo.click(addTodo)

$('.input-text').keyup(event => {
    if (event.keyCode === 13) {
        addTodo()
    }
})

const createTodoControls = todoItem => {
    const allButton = $('<div>', { class: 'todo__item-all-button' })
        .appendTo(todoItem)
    const acceptedButton = $('<button>', { class: 'todo__item-accepted' })
        .appendTo(allButton)
    const deleteButton = $('<button>', { class: 'todo__item-deleted' })
        .appendTo(allButton)
    const check = $('<i>', { class: 'fa-solid fa-check' })
        .appendTo(acceptedButton)
    const uncheck = $('<i>', { class: 'fa-solid fa-xmark' })

    $('<i>', { class: 'fa-solid fa-trash' })
        .appendTo(deleteButton)

    deleteButton.click(event => {
        $(event.target)
            .closest('li').hide(400)

        setTimeout(() => {
            $(event.target)
                .closest('li')
                .remove()
        }, 400);

        const id = $(event.target)
            .closest('li')
            .attr('data-id')

        todoMap.delete(id)
    })
    acceptedButton.click(event => {
        const id = $(event.target)
            .closest('li')
            .attr('data-id')

        if (todoMap.get(id).isDone === true) {
            const id = $(event.target)
                .closest('li')
                .attr('data-id')

            $(event.target)
                .closest('li')
                .removeClass('checked').css({
                    backgroundColor: '#fff',
                    transition: 'background-color 1s'
                })

            uncheck.remove()

            check.appendTo(acceptedButton)

            todoMap.get(id).isDone = false

            return
        }

        $(event.target)
            .closest('li')
            .addClass('checked').css({
                backgroundColor: '',
                transition: ''
            })

        todoMap.get(id).isDone = true

        check.remove()

        uncheck.appendTo(acceptedButton)
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
