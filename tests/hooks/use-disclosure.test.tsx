import { renderHook, act } from '@testing-library/react';
import { useDisclosure } from '@/shared/hooks/use-disclosure';

describe('useDisclosure', () => {
  it('opens, closes, and toggles state', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);

    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
  });
});
