# react-mobx-admin

[![Build Status](https://travis-ci.org/vencax/react-mobx-admin.svg)](https://travis-ci.org/vencax/react-mobx-admin)

Minimalistic framework for React based admin applications heavily inspired by [admin-on-rest](https://github.com/marmelab/admin-on-rest).
But this uses [MobX](https://mobxjs.github.io/mobx/) for state management.
And aims to extendability and code readability and simplicity.

This lib provides only stores for two basic data operations:
- [list](store/list.js): + paging, sorting, filtering
- [manipulation](store/manip.js): form editing, validation

Actual components (rendering of app state) are in separate library.
Currently only [bootstrap based UI is available](https://github.com/vencax/bstrap-react-mobx-admin).

See yourself an example of [blogpost list table with sorting, pagination, filtering ...](https://github.com/vencax/bstrap-react-mobx-blog-admin).
