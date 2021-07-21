# Module: "file"

### Functions

* csvFileToJsonArray
* filesAsJson
* filesExist
* jsonArrayToCsvFile

## Functions

###  csvFileToJsonArray

▸ **csvFileToJsonArray**(`filepath`: string): *Promise‹Array‹object››*

**Parameters:**

Name | Type |
------ | ------ |
`filepath` | string |

**Returns:** *Promise‹Array‹object››*

___

###  filesAsJson

▸ **filesAsJson**(`fileOrDirectoryPath`: string): *Promise‹object›*

**Parameters:**

Name | Type |
------ | ------ |
`fileOrDirectoryPath` | string |

**Returns:** *Promise‹object›*

___

###  filesExist

▸ **filesExist**(...`files`: ReadonlyArray‹string›): *Promise‹boolean›*

**Parameters:**

Name | Type |
------ | ------ |
`...files` | ReadonlyArray‹string› |

**Returns:** *Promise‹boolean›*

___

###  jsonArrayToCsvFile

▸ **jsonArrayToCsvFile**(`filepath`: string, `ar`: Array‹object›, `headerOrdering`: Array‹string›): *Promise‹string›*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`filepath` | string | - |
`ar` | Array‹object› | - |
`headerOrdering` | Array‹string› | [] |

**Returns:** *Promise‹string›*
