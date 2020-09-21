[data-mining-tools](../README.md) › [Globals](../globals.md) › ["file"](_file_.md)

# Module: "file"

## Index

### Functions

* [csvFileToJsonArray](_file_.md#csvfiletojsonarray)
* [filesAsJson](_file_.md#filesasjson)
* [filesExist](_file_.md#filesexist)
* [jsonArrayToCsvFile](_file_.md#jsonarraytocsvfile)

## Functions

###  csvFileToJsonArray

▸ **csvFileToJsonArray**(`filepath`: string): *Promise‹Array‹object››*

*Defined in [file.ts:111](https://github.com/tewen/data-mining-tools/blob/e10413d/src/lib/file.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`filepath` | string |

**Returns:** *Promise‹Array‹object››*

___

###  filesAsJson

▸ **filesAsJson**(`fileOrDirectoryPath`: string): *Promise‹object›*

*Defined in [file.ts:23](https://github.com/tewen/data-mining-tools/blob/e10413d/src/lib/file.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`fileOrDirectoryPath` | string |

**Returns:** *Promise‹object›*

___

###  filesExist

▸ **filesExist**(...`files`: ReadonlyArray‹string›): *Promise‹boolean›*

*Defined in [file.ts:6](https://github.com/tewen/data-mining-tools/blob/e10413d/src/lib/file.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`...files` | ReadonlyArray‹string› |

**Returns:** *Promise‹boolean›*

___

###  jsonArrayToCsvFile

▸ **jsonArrayToCsvFile**(`filepath`: string, `ar`: Array‹object›, `headerOrdering`: Array‹string›): *Promise‹string›*

*Defined in [file.ts:56](https://github.com/tewen/data-mining-tools/blob/e10413d/src/lib/file.ts#L56)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`filepath` | string | - |
`ar` | Array‹object› | - |
`headerOrdering` | Array‹string› | [] |

**Returns:** *Promise‹string›*
