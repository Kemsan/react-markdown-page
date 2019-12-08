// -- CORE
import md5 from '../md5'

// -- TEST
describe('md5', () => {
  it('should convert any string into md5', () => {
    expect(md5('abc')).toBe('900150983cd24fb0d6963f7d28e17f72')
    expect(md5('123')).toBe('202cb962ac59075b964b07152d234b70')
  })
})
