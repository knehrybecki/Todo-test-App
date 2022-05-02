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
  })

  test('add Todo', () => {
    const text = 'test'
    const todoNode = createNewTodo(text)

    expect($(todoNode).text()).toBe(text)
    expect($(todoNode).attr('data-id')).toBeTruthy()
    expect($(todoNode).hasClass('todo__item')).toBeTruthy()
  })

  test('add todo to Map Object', () => {
    $('.input-text').val('test')

    addTodo()

    const id = $('li:last-child').attr('data-id')
    const todo = todoMap.get(id)

    expect(todoMap.size).toBe(1)
    expect(todoMap.has(id)).toBeTruthy()
    expect(todo.isDone).toBe(false)
    expect(todo.text).toBe('test')
  })

  test('delete Todo', () => {
    $('.input-text').val('test1')

    addTodo()

    $('.todo__item-deleted').click()

    expect(todoMap.size).toBe(1)
    expect($('.todo__list').text()).not.toBe($('.todo__item'))
  })

  test('check todo', () => {
    $('.input-text').val('test2')

    addTodo()

    expect(todoMap.size).toBe(2)

    const id = $('li:last-child').attr('data-id')

    $('.todo__item-accepted').click()

    expect(todoMap.get(id).isDone).toBe(true)

    $('.todo__item-accepted').click()

    expect(todoMap.get(id).isDone).toBe(false)
  })

})
