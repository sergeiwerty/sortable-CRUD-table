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

  database.transaction(function (tx) {
    tx.executeSql('SELECT * from dataTable ORDER BY sumInfo DESC')
  })

  function outRow(id, dates, supplier, warehouse, productName, quantity, sum) {
    const row = document.createElement('tr')
    const idCell = document.createElement('td')
    const datesCell = document.createElement('td')
    const supplierCell = document.createElement('td')
    const warehouseCell = document.createElement('td')
    const productNameCell = document.createElement('td')
    const quantityCell = document.createElement('td')
    const sumCell = document.createElement('td')

    idCell.textContent = id
    datesCell.textContent = dates
    supplierCell.textContent = supplier
    warehouseCell.textContent = warehouse
    productNameCell.textContent = productName
    quantityCell.textContent = quantity
    sumCell.textContent = sum

    row.appendChild(idCell)
    row.appendChild(datesCell)
    row.appendChild(supplierCell)
    row.appendChild(warehouseCell)
    row.appendChild(productNameCell)
    row.appendChild(quantityCell)
    row.appendChild(sumCell)

    document.getElementById('table').appendChild(row)
  }

  document.getElementById('table').innerHTML =
    '<th class="id" onclick="sortById">Id</th> <th class="data">Дата</th> <th class="supplier">Наименование поставщика</th> <th class="warehouse">Склад приёмки</th> <th class="product-name">Наименование товара</th> <th class="quantity">Количество</th> <th class="sum">Сумма</th>'

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

  // database.transaction(function (tx) {
  //   tx.executeSql(
  //     'SELECT * from dataTable ORDER BY productInfo ASC',
  //     [],
  //     function (tx, result) {
  //       for (let i = 0; i < result.rows.length; i += 1) {
  //         let item = result.rows.item(i)
  //         outRow(
  //           item.id,
  //           item.date,
  //           item.supplierName,
  //           item.warehouseInfo,
  //           item.productInfo,
  //           item.quantityInfo,
  //           item.sumInfo
  //         )
  //       }
  //     }
  //   )
  // })
}

const sortById = () => {
  console.log('bang')
  database.transaction(function (tx) {
    tx.executeSql(
      'SELECT * from dataTable ORDER BY productInfo ASC',
      [],
      function (tx, result) {
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
      }
    )
  })
}

// function sortById() {
//   console.log('bang')
// }

const idColumn = document.querySelectorAll('.id')
// const dataColumn = document.querySelector('.data')
// const supplierColumn = document.querySelector('.supplier')
// const warehouseColumn = document.querySelector('.warehouse')
// const productColumn = document.querySelector('.product-name')
// const quantityColumn = document.querySelector('.quantity')
// const sumColumn = document.querySelector('.sum')

idColumn.addEventListener('click', sortById)

// var db = openDatabase('db', '1.0', 'Ixora DB', 100000)
//   document.getElementById('table').innerHTML =
//     '<th>Id</th> <th>Дата</th> <th>Наименование поставщика</th> <th>Склад приёмки</th> <th>Наименование товара</th> <th>Количество</th> <th>Сумма</th>'
//   database.transaction(function (tx) {
//     tx.executeSql('SELECT * from dataTable', [], function (tx, result) {
//       for (let i = 0; i < result.rows.length; i += 1) {
//         let item = result.rows.item(i)
//         outRow(
//           item.id,
//           item.date,
//           item.supplierName,
//           item.warehouseInfo,
//           item.productInfo,
//           item.quantityInfo,
//           item.sumInfo
//         )
//       }
//     })
//   })
// }

createDB()

// console.log(createDB())
console.log(dates)

// function DoSelect() {
//   var db = openDatabase('db', '1.0', 'Ixora DB', 100000)
//   document.getElementById('tabletable').innerHTML =
//     '<th>Id</th> <th>Дата</th> <th>Наименование поставщика</th> <th>Склад приёмки</th> <th>Наименование товара</th> <th>Количество</th> <th>Сумма</th>'
//   db.transaction(function (tx) {
//     tx.executeSql('SELECT * from dataTable', [], function (tx, result) {
//       for (var i = 0; i < result.rows.length; i++) {
//         var item = result.rows.item(i)
//         OutRow(item.id, item.name, item.value)
//       }
//     })
//   })
// }