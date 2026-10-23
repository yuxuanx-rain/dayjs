import MockDate from 'mockdate'
import dayjs from '../../src'
import isLeapYear from '../../src/plugin/isLeapYear'

dayjs.extend(isLeapYear)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('IsLeapYear', () => {
  expect(dayjs('20000101').isLeapYear()).toBe(true)
  expect(dayjs('2100-01-01').isLeapYear()).toBe(false)
})

it('recognizes ordinary leap years and common years', () => {
  expect(dayjs('1996-02-29').isLeapYear()).toBe(true)
  expect(dayjs('2023-02-28').isLeapYear()).toBe(false)
})

it('applies the century exception across different centuries', () => {
  expect(dayjs('1900-01-01').isLeapYear()).toBe(false)
  expect(dayjs('2400-01-01').isLeapYear()).toBe(true)
})

it('does not mutate the date when checking leap-year status', () => {
  const date = dayjs('2024-02-29')
  const originalValue = date.valueOf()

  expect(date.isLeapYear()).toBe(true)
  expect(date.valueOf()).toBe(originalValue)
  expect(date.format('YYYY-MM-DD')).toBe('2024-02-29')
})
