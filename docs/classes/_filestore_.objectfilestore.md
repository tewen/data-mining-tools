[data-mining-tools](../README.md) › [Globals](../globals.md) › ["fileStore"](../modules/_filestore_.md) › [ObjectFileStore](_filestore_.objectfilestore.md)

# Class: ObjectFileStore

## Hierarchy

* [FileStore](_filestore_.filestore.md)

  ↳ **ObjectFileStore**

## Index

### Constructors

* [constructor](_filestore_.objectfilestore.md#constructor)

### Properties

* [defaultContent](_filestore_.objectfilestore.md#readonly-defaultcontent)
* [encoding](_filestore_.objectfilestore.md#readonly-encoding)
* [file](_filestore_.objectfilestore.md#readonly-file)

### Methods

* [merge](_filestore_.objectfilestore.md#merge)
* [read](_filestore_.objectfilestore.md#read)
* [write](_filestore_.objectfilestore.md#write)
* [readOrCreateFile](_filestore_.objectfilestore.md#static-readorcreatefile)

## Constructors

###  constructor

\+ **new ObjectFileStore**(`file`: string, `defaultContent`: object): *[ObjectFileStore](_filestore_.objectfilestore.md)*

*Overrides [FileStore](_filestore_.filestore.md).[constructor](_filestore_.filestore.md#constructor)*

*Defined in [fileStore.ts:44](https://github.com/tewen/data-mining-tools/blob/e10413d/src/lib/fileStore.ts#L44)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`file` | string | - |
`defaultContent` | object | {} |

**Returns:** *[ObjectFileStore](_filestore_.objectfilestore.md)*

## Properties

### `Readonly` defaultContent

• **defaultContent**: *object*

*Inherited from [FileStore](_filestore_.filestore.md).[defaultContent](_filestore_.filestore.md#readonly-defaultcontent)*

*Defined in [fileStore.ts:21](https://github.com/tewen/data-mining-tools/blob/e10413d/src/lib/fileStore.ts#L21)*

___

### `Readonly` encoding

• **encoding**: *string* = "utf-8"

*Inherited from [FileStore](_filestore_.filestore.md).[encoding](_filestore_.filestore.md#readonly-encoding)*

*Defined in [fileStore.ts:20](https://github.com/tewen/data-mining-tools/blob/e10413d/src/lib/fileStore.ts#L20)*

___

### `Readonly` file

• **file**: *string*

*Inherited from [FileStore](_filestore_.filestore.md).[file](_filestore_.filestore.md#readonly-file)*

*Defined in [fileStore.ts:19](https://github.com/tewen/data-mining-tools/blob/e10413d/src/lib/fileStore.ts#L19)*

## Methods

###  merge

▸ **merge**(...`args`: any[]): *Promise‹object›*

*Defined in [fileStore.ts:49](https://github.com/tewen/data-mining-tools/blob/e10413d/src/lib/fileStore.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *Promise‹object›*

___

###  read

▸ **read**(): *Promise‹object›*

*Inherited from [FileStore](_filestore_.filestore.md).[read](_filestore_.filestore.md#read)*

*Defined in [fileStore.ts:28](https://github.com/tewen/data-mining-tools/blob/e10413d/src/lib/fileStore.ts#L28)*

**Returns:** *Promise‹object›*

___

###  write

▸ **write**(`content`: object): *Promise‹object›*

*Inherited from [FileStore](_filestore_.filestore.md).[write](_filestore_.filestore.md#write)*

*Defined in [fileStore.ts:38](https://github.com/tewen/data-mining-tools/blob/e10413d/src/lib/fileStore.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`content` | object |

**Returns:** *Promise‹object›*

___

### `Static` readOrCreateFile

▸ **readOrCreateFile**(`file`: string, `encoding`: string, `contents`: string): *Promise‹string›*

*Inherited from [FileStore](_filestore_.filestore.md).[readOrCreateFile](_filestore_.filestore.md#static-readorcreatefile)*

*Defined in [fileStore.ts:7](https://github.com/tewen/data-mining-tools/blob/e10413d/src/lib/fileStore.ts#L7)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`file` | string | - |
`encoding` | string | "utf-8" |
`contents` | string | "" |

**Returns:** *Promise‹string›*
