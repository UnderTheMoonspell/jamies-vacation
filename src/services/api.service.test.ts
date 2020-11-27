import { API } from './api.service'

jest.mock('axios', () => {
  return {
    create: jest.fn(function (this: any) {
      return this
    }),
    get: jest.fn(() => Promise.resolve('data')),
    post: jest.fn(() => Promise.resolve('data')),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    }
  } as any
});

describe('API Class tests', () => {
  it('Should call axios get', async () => {
    await API.get('lala')

    expect(API['instance'].get).toHaveBeenCalled()
  })

  it('Should call axios post with payload', async () => {
    const payload = { data: 1 }
    const url = 'lala'
    await API.post(url, payload)

    expect(API['instance'].post).toHaveBeenCalledWith(url, payload)
  })
})