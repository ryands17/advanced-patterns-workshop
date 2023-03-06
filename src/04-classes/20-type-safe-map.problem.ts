import { expect, it } from 'vitest';

/**
 * In this problem, we need to type the return type of the set()
 * method to make it add keys to the TMap generic.
 *
 * In the return type of set(), we'll need to modify the TMap
 * generic to add the new key/value pair.
 */

class TypeSafeStringMap<TMap extends Record<string, string> = {}> {
  private map: TMap;
  constructor() {
    this.map = {} as TMap;
  }

  get<K extends keyof TMap>(key: K): TMap[K] {
    return this.map[key];
  }

  set<K extends string, V extends string>(
    key: K,
    value: V
  ): TypeSafeStringMap<TMap & Record<K, V>> {
    (this.map[key] as any) = value;

    return this as any;
  }
}

const map = new TypeSafeStringMap()
  .set('matt', 'pocock')
  .set('jools', 'holland')
  .set('brandi', 'carlile');

it('Should not allow getting values which do not exist', () => {
  map.get(
    // @ts-expect-error
    'jim'
  );
});

it('Should return values from keys which do exist', () => {
  let m = map.get('matt');
  expect(m).toBe('pocock');
  expect(map.get('jools')).toBe('holland');
  expect(map.get('brandi')).toBe('carlile');
});
