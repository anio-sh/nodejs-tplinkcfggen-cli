# tp-link-cfg-generator

## Introduction

tbd

## ACL Target Notation

This project uses a compressed format to represent an ACL target.

An ACL target is a representation of a `source` or a `destination` in an access list rule.

This document outlines the relatively simple format of an ACL target.

### Format

An ACL target is comprised of an IPv4 Address, its Subnetmask and any ports of the target host/network.

The ACL target format is as follows:

`<ip>/<submask-bits>:<ports>`

---

Where `<submask-bits>` and `:<ports>` are optional.

- `<ip>` IP in IPv4 notation: `a.b.c.d`

- If no `<submask-bits>` is specified (e.g. `10.0.0.1:any`) then `/32` (`255.255.255.255`) is assumed.

- If no `<ports>` are specified, then _any_ port is assumed. (this only applies to TCP and UDP)

### Examples

| IPv4 Address | Subnet Mask     | Port(s) | ACL Target  | Explanation                                                             |
|------------|-----------------|-------------------|----------------------|-------------------------------------------------------------------------|
| `0.0.0.0`    | `0.0.0.0` | any               | `any`              | Representation of any port of host 0.0.0.0 (any host)                               |
| `10.0.0.1`   | `255.255.255.0`   | any               | `10.0.0.1/24:any`          | Representation of any port of any host inside of the network 10.0.0.1/24                                   |
| `10.0.0.1`   | `255.255.255.0`  | ssh               | `10.0.0.1/24:ssh`      | Representation of ssh port of any host inside of the network 10.0.0.1/24                 |
| `10.0.0.1`   | `255.255.255.0`   | ssh,http          | `10.0.0.1/24:ssh,http` | Representation of ssh and http ports of any host inside of the network 10.0.0.1/24 |
| `10.0.0.1`   | `255.255.255.255` | any               | `10.0.0.1/32:any`             | Representation of any port of host 10.0.0.1            
| `10.0.0.1`   | `255.255.255.255` | ssh               | `10.0.0.1/32:ssh`             | Representation of ssh port of host 10.0.0.1                                         |

### Table of equivalence

The following (non-exhaustive) list shows values that are considered equivalent:

| Full notation   | Shortened notation | Description                                                                                       |
|-----------------|--------------------|---------------------------------------------------------------------------------------------------|
| `10.0.0.1/32:any` | `10.0.0.1`           | If subnet mask is omitted 255.255.255.255 (/32) is assumed (host)                                 |
| `10.0.0.1/32:ssh` | `10.0.0.1:ssh`       | If subnet mask is omitted 255.255.255.255 (/32) is assumed (host)                                 |
| `0.0.0.0/0:any`   | `any`                | Since 0.0.0.0 with a mask of 0.0.0.0 targets all IPs the appropriate shortcut is to specify "any" |
