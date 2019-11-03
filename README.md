# react-mobx-admin

[![Build Status](https://travis-ci.org/vencax/react-mobx-admin.svg)](https://travis-ci.org/vencax/react-mobx-admin)

Minimalistic [MobX](https://mobxjs.github.io/mobx/) stores for admin applications.
Originaly inspired by [admin-on-rest](https://github.com/marmelab/admin-on-rest).
Aims to extendability and code readability and simplicity.

Stores for two basic data operations:
- [list](store/list.js): + paging, sorting, filtering
- [manipulation](store/manip.js): form editing, validation

Actual components (rendering of app state) are in separate library.
Currently only [bootstrap based UI is available](https://github.com/vencax/bstrap-react-mobx-admin).

See yourself an example of [blogpost list table with sorting, pagination, filtering ...](https://github.com/vencax/bstrap-react-mobx-blog-admin).
