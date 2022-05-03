import {
  addTodo,
  createNewTodo,
  todoMap,
} from '../main'
import $ from 'jquery'

describe('add todo to list', () => {
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
    todoMap.clear()
  })

  test('add Todo', () => {
    const text = 'test'
    const todoNode = createNewTodo(text)

    expect($(todoNode).text()).toBe(text)
    expect($(todoNode).attr('data-id')).toBeTruthy()
    expect($(todoNode).hasClass('todo__item')).toBeTruthy()
  })

  test('add todo to Map Object and check DOM', () => {
    $('.input-text').val('test')

    addTodo()

    const id = $('li:last-child').attr('data-id')
    const todo = todoMap.get(id)

    expect($('ul').has('li').length > 0).toBeTruthy()
    expect($('.todo__item').text()).not.toBe("")
    expect($('.todo__item').text()).toBe('test')
    expect($('.input-text').val()).toBe("")

    expect(todoMap.size).toBe(1)
    expect(todoMap.has(id)).toBeTruthy()
    expect(todo.isDone).toBe(false)
    expect(todo.text).toBe('test')
  })

  test('delete Todo', () => {
    jest.useFakeTimers()
    jest.spyOn(global, 'setTimeout')

    $('.input-text').val('test1')

    addTodo()

    expect($('li').has('.todo__item-all-button').length > 0).toBeTruthy
    expect($('.todo__item-all-button').has('.todo__item-deleted').length > 0).toBeTruthy()
    expect($('.todo__item-deleted').has('.fa-solid', '.fa-trash').length > 0).toBeTruthy()

    $('.todo__item-deleted').click()

    jest.runAllTimers()

    expect(todoMap.size).toBe(0)
    expect($('ul').has('li').length > 0).toBeFalsy()
  })

  test('check todo', () => {
    $('.input-text').val('test2')

    addTodo()

    expect($('li').has('.todo__item-all-button').length > 0).toBeTruthy()
    expect($('.todo__item-all-button').has('.todo__item-accepted').length > 0).toBeTruthy()
    expect($('.todo__item-accepted').has('.fa-check').length > 0).toBeTruthy()

    expect(todoMap.size).toBe(1)

    const id = $('li:last-child').attr('data-id')

    $('.todo__item-accepted').click()

    expect($('.todo__item').hasClass('checked')).toBeTruthy()
    expect($('.todo__item-accepted').has('.fa-check').length > 0).toBeFalsy()
    expect($('.todo__item-accepted').has('.fa-xmark').length > 0).toBeTruthy()
    expect(todoMap.get(id).isDone).toBe(true)

    $('.todo__item-accepted').click()

    expect($('.todo__item').hasClass('checked')).toBeFalsy()
    expect($('.todo__item-accepted').has('.fa-check').length > 0).toBeTruthy()
    expect($('.todo__item-accepted').has('.fa-xmark').length > 0).toBeFalsy()
    expect(todoMap.get(id).isDone).toBe(false)
  })
})
