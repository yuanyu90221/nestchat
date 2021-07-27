import { TransformInterceptor } from './transform.interceptor';
jest.mock('./transform.interceptor');
describe('TransformInterceptor', () => {
  it('should be defined', () => {
    expect(new TransformInterceptor()).toBeDefined();
  });
});
