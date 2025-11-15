import './style.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Calendar } from './components'

const root = createRoot(document.querySelector<HTMLDivElement>('#app')!)
const initialDate = new Date()

root.render(
  <React.StrictMode>
    <div>
      <h1>Calendar</h1>
      <Calendar date={initialDate} />
    </div>
  </React.StrictMode>
)

