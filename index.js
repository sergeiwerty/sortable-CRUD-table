import { tableData } from './data.js'

const { dates, supplier, warehouse, productName, quantity, sum } = tableData

// VARIABLES INITIALIZATION
let renderedTable = document.getElementById('table')

const dateInput = document.getElementById('date-input')
const supplierInput = document.getElementById('supplier-input')
const warehouseInput = document.getElementById('warehouse-input')
const productInput = document.getElementById('product-input')
const quantityInput = document.getElementById('quantity-input')
const sumInput = document.getElementById('sum-input')

const btnWrapper = document.querySelector('.btn-wrapper')
const updateEntryBtn = document.getElementById('updateEntryBtn')
const printBtn = document.getElementById('printBtn')

const addEntryBtn = document.getElementById('addEntryBtn')

let updatedIdForEdit
let updatedIdForDel

// DATABASE INITIALIZATION
const database = openDatabase('db', '1.0', 'Ixora DB', 1000000)

// DATABAZE TABLE INITIALIZATION
function createDB() {
  database.transaction(function (tx) {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS dataTable (id integer primary key autoincrement, date, supplierName, warehouseInfo, productInfo, quantityInfo integer, sumInfo integer)'
    )
  })

  // SET TABLE DATA
  database.transaction(function (tx) {
    for (let i = 0; i < dates.length; i += 1) {
      tx.executeSql(
        'INSERT INTO dataTable (date, supplierName, warehouseInfo, productInfo, quantityInfo, sumInfo) VALUES (?,?,?,?,?,?)',
        [
          dates[i],
          supplier[i],
          warehouse[i],
          productName[i],
          quantity[i],
          sum[i],
        ]
      )
    }
  })

  // PAGE TABLE CREATION
  renderedTable.innerHTML =
    '<th id="id">Id</th> <th id="date">Дата</th> <th id="supplierName">Наименование поставщика</th> <th id="warehouseInfo">Склад приёмки</th> <th id="productInfo">Наименование товара</th> <th id="quantityInfo">Количество</th> <th id="sumInfo">Сумма</th>'
  database.transaction(function (tx) {
    tx.executeSql('SELECT * from dataTable', [], function (tx, result) {
      for (let i = 0; i < result.rows.length; i += 1) {
        let item = result.rows.item(i)
        outRow(
          item.id,
          item.date,
          item.supplierName,
          item.warehouseInfo,
          item.productInfo,
          item.quantityInfo,
          item.sumInfo
        )
      }
    })
  })
}

// PAGE TABLE NODES CREATION
function outRow(
  id,
  dates,
  supplier,
  warehouse,
  productName,
  quantity,
  sum,
  index
) {
  const row = document.createElement('tr')
  const idCell = document.createElement('td')
  const datesCell = document.createElement('td')
  const supplierCell = document.createElement('td')
  const warehouseCell = document.createElement('td')
  const productNameCell = document.createElement('td')
  const quantityCell = document.createElement('td')
  const sumCell = document.createElement('td')
  const copyBtn = document.createElement('button')
  const editBtn = document.createElement('button')
  const delBtn = document.createElement('button')

  // SETTIN NODES ATTRIBUTES
  idCell.setAttribute('id', `idCell-${index}`)
  datesCell.setAttribute('id', `datesCell-${index}`)
  supplierCell.setAttribute('id', `supplierCell-${index}`)
  warehouseCell.setAttribute('id', `warehouseCell-${index}`)
  productNameCell.setAttribute('id', `productNameCell-${index}`)
  quantityCell.setAttribute('id', `quantityCell-${index}`)
  sumCell.setAttribute('id', `sumCell-${index}`)

  copyBtn.setAttribute('class', 'copyBtn')
  copyBtn.classList.add('btn', 'btn-success', 'p-0')

  editBtn.setAttribute('class', 'editBtn')
  editBtn.classList.add('btn', 'btn-primary', 'p-0', 'm-1')

  delBtn.setAttribute('class', 'delBtn')
  delBtn.classList.add('btn', 'btn-danger', 'p-0')
  delBtn.setAttribute('type', 'button')

  // SETTIN NODES CONTENT
  idCell.textContent = id
  datesCell.textContent = dates
  supplierCell.textContent = supplier
  warehouseCell.textContent = warehouse
  productNameCell.textContent = productName
  quantityCell.textContent = quantity
  sumCell.textContent = sum
  copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
  <path pointer-events="fill" d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
</svg>`
  editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
    <path pointer-events="fill" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
  </svg>`
  delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
  <path pointer-events="fill" d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`

  // APPENDING NODES INTO TABLE ROWS
  row.appendChild(idCell)
  row.appendChild(datesCell)
  row.appendChild(supplierCell)
  row.appendChild(warehouseCell)
  row.appendChild(productNameCell)
  row.appendChild(quantityCell)
  row.appendChild(sumCell)
  row.appendChild(copyBtn)
  row.appendChild(editBtn)
  row.appendChild(delBtn)

  document.getElementById('table').appendChild(row)

  // EVENT HANDLERS INITIALIZATION
  setTimeout(() => {
    const copyBtn = document.querySelectorAll('.copyBtn').forEach((item) => {
      item.onclick = function (event) {
        const elements = Array.from(event.target.parentElement.children)
        const c = (acc, node) => {
          acc.push(node.textContent)
          return acc
        }
        copyEntry(elements.reduce(c, []).slice(1, -3).join("', '"))
      }
    })

    table.onclick = function (event) {
      let target = event.target
      if (target.tagName !== 'TH') return
      sortByColumn(event.target.getAttribute('id'))
    }

    addEntryBtn.onclick = function () {
      addEntry()
    }

    const editBtn = document.querySelectorAll('.editBtn').forEach((item) => {
      item.addEventListener('click', (event) => {
        const elements = Array.from(event.target.parentElement.children)
        const c = (acc, node) => {
          acc.push(node.textContent)
          return acc
        }
        updatedIdForEdit = elements.reduce(c, [])[0]
        editEntry(elements.reduce(c, []).slice(1, -1))
      })
    })

    updateEntryBtn.onclick = function () {
      updateEntry()
    }

    const delBtn = document.querySelectorAll('.delBtn').forEach((item) => {
      item.addEventListener('click', (event) => {
        const elements = Array.from(event.target.parentElement.children)
        const c = (acc, node) => {
          acc.push(node.textContent)
          return acc
        }
        updatedIdForDel = elements.reduce(c, [])[0]
      })
    })

    const delEvent = document.querySelectorAll('.delBtn').forEach((item) => {
      item.onclick = function () {
        delEntry()
      }
    })

    printBtn.onclick = function () {
      printData()
    }
  }, 10)
}

const table = document.getElementById('table')

// UTILITY FUNCTION FOR FOT COLUMN SORTING
function replacementRow(
  id,
  dates,
  supplier,
  warehouse,
  productName,
  quantity,
  sum,
  counter
) {
  setTimeout(() => {
    const idCell = document.getElementById(`idCell-${counter}`)
    const datesCell = document.getElementById(`datesCell-${counter}`)
    const supplierCell = document.getElementById(`supplierCell-${counter}`)
    const warehouseCell = document.getElementById(`warehouseCell-${counter}`)
    const productNameCell = document.getElementById(
      `productNameCell-${counter}`
    )
    const quantityCell = document.getElementById(`quantityCell-${counter}`)
    const sumCell = document.getElementById(`sumCell-${counter}`)

    idCell.textContent = id
    datesCell.textContent = dates
    supplierCell.textContent = supplier
    warehouseCell.textContent = warehouse
    productNameCell.textContent = productName
    quantityCell.textContent = quantity
    sumCell.textContent = sum
  }, 200)
}

let condition = true

// SORTING FUNCTION
const sortByColumn = (idAttribute) => {
  condition = !condition
  let selectText
  if (condition) {
    selectText = `SELECT * from dataTable ORDER BY ${idAttribute} ASC`
  } else {
    selectText = `SELECT * from dataTable ORDER BY ${idAttribute}  DESC`
  }
  database.transaction(function (tx) {
    tx.executeSql(`${selectText}`, [], function (tx, result) {
      for (let i = 0; i < result.rows.length; i += 1) {
        let item = result.rows.item(i)
        let index = i + 1
        replacementRow(
          item.id,
          item.date,
          item.supplierName,
          item.warehouseInfo,
          item.productInfo,
          item.quantityInfo,
          item.sumInfo,
          index
        )
      }
    })
  })
}

// UTILITY FUNCTION FOR UPDATING TABLE ROWS
const removeRows = () => {
  const tableColl = table.getElementsByTagName('tr')
  for (let i = tableColl.length - 1; i > 0; i -= 1) {
    tableColl[1].parentNode.removeChild(tableColl[1])
  }
}

// FUNCTION FOR ENTRIES COPYING
const copyEntry = (string) => {
  const newStr = "'" + `${string}` + "'"
  database.transaction(function (tx) {
    tx.executeSql(
      `INSERT INTO dataTable (date, supplierName, warehouseInfo, productInfo, quantityInfo, sumInfo) VALUES (${newStr})`
    )
  })
  removeRows()

  database.transaction(function (tx) {
    tx.executeSql('SELECT * from dataTable', [], function (tx, result) {
      for (let i = 0; i < result.rows.length; i += 1) {
        let item = result.rows.item(i)
        outRow(
          item.id,
          item.date,
          item.supplierName,
          item.warehouseInfo,
          item.productInfo,
          item.quantityInfo,
          item.sumInfo,
          i + 1
        )
      }
    })
  })
}

// FUNCTION FOR ENTRIES EDITING
const editEntry = (arr) => {
  dateInput.value = arr[0]
  supplierInput.value = arr[1]
  warehouseInput.value = arr[2]
  productInput.value = arr[3]
  quantityInput.value = arr[4]
  sumInput.value = arr[5]
}

// FUNCTION FOR ENTRIES DELITING
const delEntry = () => {
  database.transaction(function (tx) {
    tx.executeSql(`DELETE FROM dataTable WHERE id='${updatedIdForDel}'`)
  })

  removeRows()

  database.transaction(function (tx) {
    tx.executeSql('SELECT * from dataTable', [], function (tx, result) {
      let length = result.rows.length

      for (let i = 0; i < result.rows.length; i += 1) {
        let item = result.rows.item(i)
        outRow(
          item.id,
          item.date,
          item.supplierName,
          item.warehouseInfo,
          item.productInfo,
          item.quantityInfo,
          item.sumInfo,
          i + 1
        )
      }
    })
  })
}

// FUNCTION FOR ADDING NEW ENTRIES
const addEntry = () => {
  database.transaction(function (tx) {
    tx.executeSql(
      `INSERT INTO dataTable (date, supplierName, warehouseInfo, productInfo, quantityInfo, sumInfo) VALUES ('${dateInput.value}', '${supplierInput.value}', '${warehouseInput.value}', '${productInput.value}', '${quantityInput.value}', '${sumInput.value}')`
    )
  })

  removeRows()

  database.transaction(function (tx) {
    tx.executeSql('SELECT * from dataTable', [], function (tx, result) {
      for (let i = 0; i < result.rows.length; i += 1) {
        let item = result.rows.item(i)
        outRow(
          item.id,
          item.date,
          item.supplierName,
          item.warehouseInfo,
          item.productInfo,
          item.quantityInfo,
          item.sumInfo,
          i + 1
        )
      }
    })
  })
}

// FUNCTION FOR THE FIELDS CLEANUP
function ridInputs() {
  dateInput.value = ''
  supplierInput.value = ''
  warehouseInput.value = ''
  productInput.value = ''
  quantityInput.value = ''
  sumInput.value = ''
}

const updateEntry = () => {
  database.transaction(function (tx) {
    tx.executeSql(
      `UPDATE dataTable SET date='${dateInput.value}', supplierName='${supplierInput.value}', warehouseInfo='${warehouseInput.value}', productInfo='${productInput.value}', quantityInfo='${quantityInput.value}', sumInfo='${sumInput.value}' WHERE id='${updatedIdForEdit}'`
    )
  })

  removeRows()
  setTimeout(() => ridInputs(), 20)

  database.transaction(function (tx) {
    tx.executeSql('SELECT * from dataTable', [], function (tx, result) {
      for (let i = 0; i < result.rows.length; i += 1) {
        let item = result.rows.item(i)
        outRow(
          item.id,
          item.date,
          item.supplierName,
          item.warehouseInfo,
          item.productInfo,
          item.quantityInfo,
          item.sumInfo,
          i + 1
        )
      }
    })
  })
}

const copybtn = document.querySelectorAll('.copyBtn').forEach((item) => {
  item.onclick = function (event) {
    const elements = Array.from(event.target.parentElement.children)
    const c = (acc, node) => {
      acc.push(node.textContent)
      return acc
    }
    copyEntry(elements.reduce(c, []).slice(1, -3).join("', '"))
  }
})

// FUNCTION FOR THE TABLE PRINTING
const printData = () => {
  const originalContent = document.cloneNode(true)

  originalContent.querySelectorAll('.btn').forEach((item) => item.remove())
  const printableTable = originalContent.getElementById('table')

  const newWin = window.open('')
  newWin.document.write(printableTable.outerHTML)
  newWin.print()
  newWin.close()
}

// INITIAL FUNCTION
const initializeDB = (() => {
  let executed = false
  return () => {
    if (!executed) {
      executed = true
      createDB()
    }
  }
})()

initializeDB()
