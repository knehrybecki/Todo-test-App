import $ from 'jquery'
import {addTodo, createNewTodo, createTodoControls, todoMap } from '../main'


describe('add todo to list', () => {
  const text = 'test'
  const todoNode = createNewTodo(text)

  beforeEach(() => {
    $(document.body).append(`
        <input type="text" value="" placeholder="What do you need ?" class="input-text" required></input>
        <button class="add-item">
          <i class="fa-regular fa-plus"></i>
        </button>
        <div class="todo">
          <ul class="todo__list"></ul>
        </div>
    `)
  })

  afterEach(() => {
    $(document.body).empty()
  })

  test('add Todo', () => {
    expect($(todoNode).text()).toBe(text)
    expect($(todoNode).attr('data-id')).toBeTruthy()
    expect($(todoNode).hasClass('todo__item')).toBeTruthy()
  })

  test('add todo to Map Object', () => {
    $(todoNode).appendTo($('.todo__list'))
    
    todoMap.set(todoNode.attr('data-id'), {
      isDone: false,
      text: text
    })

    const id = $('li:last-child').attr('data-id')
    const todo = todoMap.get(id)

    expect(todoMap.size).toBe(1)
    expect(todoMap.has(id)).toBeTruthy()
    expect(todo.isDone).toBe(false)
    expect(todo.text).toBe(text)
  })

  test('delete Todo', () => {
    $(todoNode).appendTo($('.todo__list'))

    createTodoControls(todoNode)

    $('.todo__item-deleted').click()

    expect(todoMap.size).toBe(0)
    expect($('.todo__list').text()).not.toBe($('.todo__item'))
  })

  test('check todo', () => {
    $(todoNode).appendTo($('.todo__list'))
    todoMap.set(todoNode.attr('data-id'), {
      isDone: false,
      text: text
    })

    createTodoControls(todoNode)

    expect(todoMap.size).toBe(1)

    const id = $('li:last-child').attr('data-id')

    $('.todo__item-accepted').click()

    expect(todoMap.get(id).isDone).toBe(true)

    $('.todo__item-accepted').click()

    expect(todoMap.get(id).isDone).toBe(false)
  })
})

