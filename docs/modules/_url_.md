[data-mining-tools](../README.md) › [Globals](../globals.md) › ["url"](_url_.md)

# Module: "url"

## Index

### Functions

* [cleanUrl](_url_.md#cleanurl)
* [domainAndSuffixFromUrl](_url_.md#domainandsuffixfromurl)
* [isLiveUrl](_url_.md#isliveurl)
* [isParkingPage](_url_.md#isparkingpage)
* [isSuccess](_url_.md#const-issuccess)

## Functions

###  cleanUrl

▸ **cleanUrl**(`url`: string): *string*

*Defined in [url.ts:42](https://github.com/tewen/data-mining-tools/blob/9a5675d/src/lib/url.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *string*

___

###  domainAndSuffixFromUrl

▸ **domainAndSuffixFromUrl**(`url`: string): *string*

*Defined in [url.ts:32](https://github.com/tewen/data-mining-tools/blob/9a5675d/src/lib/url.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *string*

___

###  isLiveUrl

▸ **isLiveUrl**(`url`: string, `__namedParameters`: object): *Promise‹boolean›*

*Defined in [url.ts:61](https://github.com/tewen/data-mining-tools/blob/9a5675d/src/lib/url.ts#L61)*

**Parameters:**

▪ **url**: *string*

▪`Default value`  **__namedParameters**: *object*= {}

Name | Type | Default |
------ | ------ | ------ |
`timeout` | number | 10000 |

**Returns:** *Promise‹boolean›*

___

###  isParkingPage

▸ **isParkingPage**(`url`: string): *Promise‹boolean›*

*Defined in [url.ts:9](https://github.com/tewen/data-mining-tools/blob/9a5675d/src/lib/url.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹boolean›*

___

### `Const` isSuccess

▸ **isSuccess**(`status`: number): *boolean*

*Defined in [url.ts:7](https://github.com/tewen/data-mining-tools/blob/9a5675d/src/lib/url.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`status` | number |

**Returns:** *boolean*
