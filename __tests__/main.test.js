import {
  createNewTodo,
  createTodoControls,
  todoArray
} from '../main'

const { JSDOM } = require("jsdom");
const { window } = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
const $ = require("jquery")(window);

describe("add todo to list", () => {
  beforeEach(() => {
    $("body").html('<input type="text" value="" placeholder="What do you need ?" class="input-text" required></input>'
      + '<button class="add-item">' +
      '<i class="fa-regular fa-plus"></i>' +
      '</button>'
      + '<div class="todo"/>' + '<ul class="todo__list"></ul>'
      + '</div>')
  })
  test('check data todo', () => {
    expect(typeof createNewTodo()).toBe('object')
  })

  test('add Todo', () => {
    $('.input-text').val("water")

    const newTodo = createNewTodo($('.input-text').val())
    createTodoControls(newTodo)

    newTodo.appendTo($('.todo__list'))

    todoArray.set(newTodo.attr('data-id'), {
      isDone: false,
      text: $('.input-text').val()
    })
    const keys = [...todoArray.keys()]

    expect(keys).toContain(newTodo.attr('data-id'))

    expect($('li:last-child')[0]).toBe(newTodo[0])
  })

})
