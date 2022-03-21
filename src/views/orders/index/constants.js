export const QUERIES = {
  PRIORITY: {
    orderBy: [{
      column: 'CREATED_AT',
      order: 'ASC'
    }],
    where: {
      column: 'CLOSED_AT',
      operator: 'IS_NULL'
    }
  },
  OLDER: {
    orderBy: [{
      column: 'CREATED_AT',
      order: 'ASC'
    }],
    where: null
  },
  NEWER: {
    orderBy: [{
      column: 'CREATED_AT',
      order: 'DESC'
    }],
    where: null
  },
  DELIVERY_DATE: {
    orderBy: [{
      column: 'DELIVERY_DATE',
      order: 'DESC'
    }],
    where: {
      column: 'CLOSED_AT',
      operator: 'IS_NULL'
    }
  },
  PRE_REGISTER: {
    where: {
      OR: [
        { column: 'QUANTITY', operator: 'IS_NULL' },
        { column: 'CLIENT_ID', operator: 'IS_NULL' }
      ]
    }
  }
}
