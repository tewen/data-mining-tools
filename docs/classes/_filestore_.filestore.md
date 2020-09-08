[data-mining-tools](../README.md) › [Globals](../globals.md) › ["fileStore"](../modules/_filestore_.md) › [FileStore](_filestore_.filestore.md)

# Class: FileStore

## Hierarchy

* **FileStore**

  ↳ [ObjectFileStore](_filestore_.objectfilestore.md)

  ↳ [ArrayFileStore](_filestore_.arrayfilestore.md)

## Index

### Constructors

* [constructor](_filestore_.filestore.md#constructor)

### Properties

* [defaultContent](_filestore_.filestore.md#readonly-defaultcontent)
* [encoding](_filestore_.filestore.md#readonly-encoding)
* [file](_filestore_.filestore.md#readonly-file)

### Methods

* [read](_filestore_.filestore.md#read)
* [write](_filestore_.filestore.md#write)
* [readOrCreateFile](_filestore_.filestore.md#static-readorcreatefile)

## Constructors

###  constructor

\+ **new FileStore**(`file`: string, `defaultContent`: object): *[FileStore](_filestore_.filestore.md)*

*Defined in [fileStore.ts:21](https://github.com/tewen/data-mining-tools/blob/9a5675d/src/lib/fileStore.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | string |
`defaultContent` | object |

**Returns:** *[FileStore](_filestore_.filestore.md)*

## Properties

### `Readonly` defaultContent

• **defaultContent**: *object*

*Defined in [fileStore.ts:21](https://github.com/tewen/data-mining-tools/blob/9a5675d/src/lib/fileStore.ts#L21)*

___

### `Readonly` encoding

• **encoding**: *string* = "utf-8"

*Defined in [fileStore.ts:20](https://github.com/tewen/data-mining-tools/blob/9a5675d/src/lib/fileStore.ts#L20)*

___

### `Readonly` file

• **file**: *string*

*Defined in [fileStore.ts:19](https://github.com/tewen/data-mining-tools/blob/9a5675d/src/lib/fileStore.ts#L19)*

## Methods

###  read

▸ **read**(): *Promise‹object›*

*Defined in [fileStore.ts:28](https://github.com/tewen/data-mining-tools/blob/9a5675d/src/lib/fileStore.ts#L28)*

**Returns:** *Promise‹object›*

___

###  write

▸ **write**(`content`: object): *Promise‹object›*

*Defined in [fileStore.ts:38](https://github.com/tewen/data-mining-tools/blob/9a5675d/src/lib/fileStore.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`content` | object |

**Returns:** *Promise‹object›*

___

### `Static` readOrCreateFile

▸ **readOrCreateFile**(`file`: string, `encoding`: string, `contents`: string): *Promise‹string›*

*Defined in [fileStore.ts:7](https://github.com/tewen/data-mining-tools/blob/9a5675d/src/lib/fileStore.ts#L7)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`file` | string | - |
`encoding` | string | "utf-8" |
`contents` | string | "" |

**Returns:** *Promise‹string›*
