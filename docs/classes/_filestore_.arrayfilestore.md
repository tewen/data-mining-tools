[data-mining-tools](../README.md) › [Globals](../globals.md) › ["fileStore"](../modules/_filestore_.md) › [ArrayFileStore](_filestore_.arrayfilestore.md)

# Class: ArrayFileStore

## Hierarchy

* [FileStore](_filestore_.filestore.md)

  ↳ **ArrayFileStore**

## Index

### Constructors

* [constructor](_filestore_.arrayfilestore.md#constructor)

### Properties

* [defaultContent](_filestore_.arrayfilestore.md#readonly-defaultcontent)
* [encoding](_filestore_.arrayfilestore.md#readonly-encoding)
* [file](_filestore_.arrayfilestore.md#readonly-file)

### Methods

* [concat](_filestore_.arrayfilestore.md#concat)
* [read](_filestore_.arrayfilestore.md#read)
* [updateBy](_filestore_.arrayfilestore.md#updateby)
* [write](_filestore_.arrayfilestore.md#write)
* [readOrCreateFile](_filestore_.arrayfilestore.md#static-readorcreatefile)

## Constructors

###  constructor

\+ **new ArrayFileStore**(`file`: string, `defaultContent`: object): *[ArrayFileStore](_filestore_.arrayfilestore.md)*

*Overrides [FileStore](_filestore_.filestore.md).[constructor](_filestore_.filestore.md#constructor)*

*Defined in [fileStore.ts:56](https://github.com/tewen/data-mining-tools/blob/58f19c9/src/lib/fileStore.ts#L56)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`file` | string | - |
`defaultContent` | object | [] |

**Returns:** *[ArrayFileStore](_filestore_.arrayfilestore.md)*

## Properties

### `Readonly` defaultContent

• **defaultContent**: *object*

*Inherited from [FileStore](_filestore_.filestore.md).[defaultContent](_filestore_.filestore.md#readonly-defaultcontent)*

*Defined in [fileStore.ts:21](https://github.com/tewen/data-mining-tools/blob/58f19c9/src/lib/fileStore.ts#L21)*

___

### `Readonly` encoding

• **encoding**: *string* = "utf-8"

*Inherited from [FileStore](_filestore_.filestore.md).[encoding](_filestore_.filestore.md#readonly-encoding)*

*Defined in [fileStore.ts:20](https://github.com/tewen/data-mining-tools/blob/58f19c9/src/lib/fileStore.ts#L20)*

___

### `Readonly` file

• **file**: *string*

*Inherited from [FileStore](_filestore_.filestore.md).[file](_filestore_.filestore.md#readonly-file)*

*Defined in [fileStore.ts:19](https://github.com/tewen/data-mining-tools/blob/58f19c9/src/lib/fileStore.ts#L19)*

## Methods

###  concat

▸ **concat**(`item`: object): *Promise‹object›*

*Defined in [fileStore.ts:61](https://github.com/tewen/data-mining-tools/blob/58f19c9/src/lib/fileStore.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

**Returns:** *Promise‹object›*

___

###  read

▸ **read**(): *Promise‹object›*

*Inherited from [FileStore](_filestore_.filestore.md).[read](_filestore_.filestore.md#read)*

*Defined in [fileStore.ts:28](https://github.com/tewen/data-mining-tools/blob/58f19c9/src/lib/fileStore.ts#L28)*

**Returns:** *Promise‹object›*

___

###  updateBy

▸ **updateBy**(`key`: string, `item`: object, `updateByMerge`: boolean): *Promise‹object›*

*Defined in [fileStore.ts:66](https://github.com/tewen/data-mining-tools/blob/58f19c9/src/lib/fileStore.ts#L66)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`key` | string | - |
`item` | object | - |
`updateByMerge` | boolean | false |

**Returns:** *Promise‹object›*

___

###  write

▸ **write**(`content`: object): *Promise‹object›*

*Inherited from [FileStore](_filestore_.filestore.md).[write](_filestore_.filestore.md#write)*

*Defined in [fileStore.ts:38](https://github.com/tewen/data-mining-tools/blob/58f19c9/src/lib/fileStore.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`content` | object |

**Returns:** *Promise‹object›*

___

### `Static` readOrCreateFile

▸ **readOrCreateFile**(`file`: string, `encoding`: string, `contents`: string): *Promise‹string›*

*Inherited from [FileStore](_filestore_.filestore.md).[readOrCreateFile](_filestore_.filestore.md#static-readorcreatefile)*

*Defined in [fileStore.ts:7](https://github.com/tewen/data-mining-tools/blob/58f19c9/src/lib/fileStore.ts#L7)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`file` | string | - |
`encoding` | string | "utf-8" |
`contents` | string | "" |

**Returns:** *Promise‹string›*
