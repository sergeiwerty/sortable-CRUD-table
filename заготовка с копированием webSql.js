// database.transaction(function (tx) {tx.executeSql()}
// tx.executeSql(``, ))

// db.transaction(function (tx) {
//   tx.executeSql('CREATE TABLE Foo(ID INTEGER)')
//   tx.executeSql('CREATE TABLE Bar(ID INTEGER)', function (tx, result) {
//     alert('success!')
//   })
// })

// ')

db.transaction(function (tx) {
  tx.executeSql(
    `INSERT INTO dataTable (date, supplierName, warehouseInfo, productInfo, quantityInfo, sumInfo) VALUES ('${
      arr[0]
    }', '${arr[1]}', '${arr[2]}', '${arr[3]}', '${Number(arr[4])}', '${Number(
      arr[5]
    )}')`
  )
  tx.executeSql(
    `UPDATE dataTable SET date='${arr[0]}', supplierName='${
      arr[1]
    }', warehouseInfo='${arr[2]}', productInfo='${
      arr[3]
    }', quantityInfo='${Number(arr[4])}', sumInfo='${Number(
      arr[5]
    )}' WHERE id='${arr[0]}`
  )
})

/// верная транзакция
database.transaction(function (tx) {
  tx.executeSql(
    `INSERT INTO dataTable (date, supplierName, warehouseInfo, productInfo, quantityInfo, sumInfo) VALUES ('${
      arr[1]
    }', '${arr[2]}', '${arr[3]}', '${arr[4]}', '${Number(arr[5])}', '${Number(
      arr[6]
    )}')`
  )
  tx.executeSql(
    `UPDATE dataTable SET date='${arr[1]}', supplierName='${
      arr[2]
    }', warehouseInfo='${arr[3]}', productInfo='${
      arr[4]
    }', quantityInfo='${Number(arr[5])}', sumInfo='${Number(
      arr[6]
    )}' WHERE id='${arr[0]}'`
  )
})
