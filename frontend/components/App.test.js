// Write your tests here
import React from "react"
import {render, screen, waitFor,fireEvent} from "@testing-library/react"
import AppFunctional from "./AppFunctional"
import '@testing-library/jest-dom/extend-expect'


test('sanity', () => {
  expect(true).toBe(true)
});
test("", ()=>{
  render (<AppFunctional />)
});
test("başlangıçta x ve y koordinatları doğru gösteriliyor", ()=>{
  render (<AppFunctional />)

  const kareler = screen.getByAltText(/koordinatlar/i)

  expect(kareler).toHaveTextContent("(2,2)")
});

test("yukarı basınca koordinatları doğru gösteriyor", ()=>{
  render (<AppFunctional />)

  const up = screen.getByAltText(/koordinatlar/i)
  const upButton = screen.getByAltText("YUKARI")

  fireEvent.click(upButton);
  expect(up).toHaveTextContent("(2,1)")
});

test("2 kez yukarı basınca hata mesajı gösteriyor", ()=>{
  render (<AppFunctional />)

  const mesaj = document.querySelector('#message')
  const upButton = screen.getByAltText("YUKARI")

  fireEvent.click(upButton);
  fireEvent.click(upButton);

  expect(mesaj).toHaveTextContent("Yukarıya gidemezsiniz")
});


test("hatalı email girildiğinde hata mesajı veriyor", async ()=>{
  render (<AppFunctional />)

  const mailInput = document.document.querySelector('#email')
  const button = document.querySelector('#submit')  

  fireEvent.change(mailInput, {target: {value:"asdasf@foo.bar"}});
  fireEvent.click(button);
  
  await waitFor(() =>{
    const message = screen.queryByText("Ouch: email must be a valid email");
    expect(message).toBeInTheDocument;
  })
});


test("doğru email girildiğinde hata mesajı veriyor", async ()=>{
  render (<AppFunctional />)

  const mesaj =  document.querySelector('#message')
  const mailInput = document.document.querySelector('#email')
  const button = document.querySelector('#submit')

  fireEvent.change(mailInput, {target: {value:"asdasf@gmail.com"}});
  fireEvent.click(button);

  await waitFor(() =>{
    const message = screen.queryByText(/win/i);
    expect(message).toBeInTheDocument;
  })
});