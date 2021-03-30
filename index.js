import { tableData } from './data.js'
const { dates, supplier, warehouse, productName, quantity, sum } = tableData
// const database = openDatabase('ixoraDB', '0.1', 'Ixora test database', 100000)
const database = openDatabase('db', '1.0', 'Ixora DB', 1000000)

function createDB() {
  // table creation
  database.transaction(function (tx) {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS dataTable (id integer primary key autoincrement, date, supplierName, warehouseInfo, productInfo, quantityInfo, sumInfo)'
    )
  })

  // add data

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

  document.getElementById('table').innerHTML =
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

function outRow(id, dates, supplier, warehouse, productName, quantity, sum) {
  const row = document.createElement('tr')
  const idCell = document.createElement('td')
  const datesCell = document.createElement('td')
  const supplierCell = document.createElement('td')
  const warehouseCell = document.createElement('td')
  const productNameCell = document.createElement('td')
  const quantityCell = document.createElement('td')
  const sumCell = document.createElement('td')
  const copyBtn = document.createElement('button')

  idCell.setAttribute('id', `idCell-${id}`)
  datesCell.setAttribute('id', `datesCell-${id}`)
  supplierCell.setAttribute('id', `supplierCell-${id}`)
  warehouseCell.setAttribute('id', `warehouseCell-${id}`)
  productNameCell.setAttribute('id', `productNameCell-${id}`)
  quantityCell.setAttribute('id', `quantityCell-${id}`)
  sumCell.setAttribute('id', `sumCell-${id}`)
  copyBtn.setAttribute('class', 'copyBtn')
  // copyBtn.setAttribute('onclick', 'copyFn()')

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

  row.appendChild(idCell)
  row.appendChild(datesCell)
  row.appendChild(supplierCell)
  row.appendChild(warehouseCell)
  row.appendChild(productNameCell)
  row.appendChild(quantityCell)
  row.appendChild(sumCell)
  row.appendChild(copyBtn)

  document.getElementById('table').appendChild(row)

  setTimeout(() => {
    table.onclick = function (event) {
      let target = event.target
      if (target.tagName !== 'TH') return
      // console.log(event.target.getAttribute('id'))
      sortByColumn(event.target.getAttribute('id'))
    }
    const copyBtn = document.querySelectorAll('.copyBtn').forEach((item) => {
      item.onclick = function (event) {
        const elements = Array.from(event.target.parentElement.children)
        const c = (acc, node) => {
          acc.push(node.textContent)
          return acc
        }
        copyEntry(elements.reduce(c, []).slice(1, -1).join("', '"))
      }
    })
  }, 10)
}

const table = document.getElementById('table')

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

const removeRows = () => {
  const tableColl = table.getElementsByTagName('tr')
  // console.log(tableColl.slice(1))
  // console.log(tableColl.length)
  // const collArray = Array.from(tableColl)
  // console.log(collArray.length)
  for (let i = tableColl.length - 1; i > 0; i -= 1) {
    tableColl[1].parentNode.removeChild(tableColl[1])
    console.log(tableColl)
  }

  console.log(tableColl)
}

const copyEntry = (string) => {
  // ("'" + `${string}` + "'")
  const newStr = "'" + `${string}` + "'"
  console.log(typeof newStr)
  console.log(newStr)

  //   console.log(string.forEach((word) => {
  // `'${word},'`
  //   }))
  // INSERT INTO dataTable (date, supplierName, warehouseInfo, productInfo, quantityInfo, sumInfo) VALUES (${newStr})
  database.transaction(function (tx) {
    tx.executeSql(
      `INSERT INTO dataTable (date, supplierName, warehouseInfo, productInfo, quantityInfo, sumInfo) VALUES (${newStr})`
      // 'SELECT DISTINCT date, supplierName, warehouseInfo, productInfo, quantityInfo, sumInfo FROM dataTable',
      // [],
      // function (tx, result) {
      //   for (let i = 0; i < result.rows.length; i += 1) {
      //     let item = result.rows.item(i)
      //     let index = i + 1
      //     outRow(
      //       item.id,
      //       item.date,
      //       item.supplierName,
      //       item.warehouseInfo,
      //       item.productInfo,
      //       item.quantityInfo,
      //       item.sumInfo,
      //       index
      //     )
      //   }
      // }
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
          item.sumInfo
        )
      }
    })
  })
  // console.log(outRow)
  // outRow()
  // createDB()
}

// createDB()
// copyEntry()

// setTimeout(() => {
//   const copyBtn = document.querySelectorAll('.copyBtn').forEach((item) => {
//     item.addEventListener('click', (cb) => {
//       console.log(Array.from(event.target.parentElement.children))
//       const elements = Array.from(event.target.parentElement.children)
//       const c = (acc, node) => {
//         // console.log(node.textContent)
//         acc.push(node.textContent)
//         return acc
//       }
//       console.log(elements.reduce(c, []).slice(1, -1).join(', '))
//       copyEntry()
//       // console.log(elements[1].textContent)
//     })
//   })
// }, 200)

// copyBtn.addEventListener

// const createDbBtn = document.getElementById('createDbBtn')
// setTimeout(
//   // (createDbBtn.onclick = function () {
//   //   // copyEntry()
//   //   removeRows()
//   //   // createDB()
//   // }),
//   (createDbBtn.onclick = createDB),
//   200
// )

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
