[data-mining-tools](../README.md) › [Globals](../globals.md) › ["url"](_url_.md)

# Module: "url"

## Index

### Functions

* [cleanUrl](_url_.md#cleanurl)
* [domainAndSuffixFromUrl](_url_.md#domainandsuffixfromurl)
* [isLiveUrl](_url_.md#isliveurl)
* [isParkingPage](_url_.md#isparkingpage)
* [isStaticErrorPage](_url_.md#isstaticerrorpage)
* [isSuccess](_url_.md#const-issuccess)

## Functions

###  cleanUrl

▸ **cleanUrl**(`url`: string): *string*

*Defined in [url.ts:51](https://github.com/tewen/data-mining-tools/blob/58f19c9/src/lib/url.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *string*

___

###  domainAndSuffixFromUrl

▸ **domainAndSuffixFromUrl**(`url`: string): *string*

*Defined in [url.ts:41](https://github.com/tewen/data-mining-tools/blob/58f19c9/src/lib/url.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *string*

___

###  isLiveUrl

▸ **isLiveUrl**(`url`: string, `__namedParameters`: object): *Promise‹boolean›*

*Defined in [url.ts:70](https://github.com/tewen/data-mining-tools/blob/58f19c9/src/lib/url.ts#L70)*

**Parameters:**

▪ **url**: *string*

▪`Default value`  **__namedParameters**: *object*= {}

Name | Type | Default |
------ | ------ | ------ |
`parkingPageCheck` | boolean | true |
`timeout` | number | 10000 |

**Returns:** *Promise‹boolean›*

___

###  isParkingPage

▸ **isParkingPage**(`url`: string): *Promise‹boolean›*

*Defined in [url.ts:16](https://github.com/tewen/data-mining-tools/blob/58f19c9/src/lib/url.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹boolean›*

___

###  isStaticErrorPage

▸ **isStaticErrorPage**(`html`: string): *boolean*

*Defined in [url.ts:10](https://github.com/tewen/data-mining-tools/blob/58f19c9/src/lib/url.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`html` | string |

**Returns:** *boolean*

___

### `Const` isSuccess

▸ **isSuccess**(`status`: number): *boolean*

*Defined in [url.ts:8](https://github.com/tewen/data-mining-tools/blob/58f19c9/src/lib/url.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`status` | number |

**Returns:** *boolean*
