import { describe, it, expect } from 'vitest';
import { jsonToTranscript } from '../src/lib/transform';

describe('jsonToTranscript', () => {
  it('transforms sample replicate JSON into timestamped transcript', () => {
    const sample = JSON.stringify({
      output: {
        chunks: [
          { text: ' hello world', timestamp: [0, 1.234] },
          { text: ' next line', timestamp: [2, 3.5] }
        ]
      }
    });

    const result = jsonToTranscript(sample);
    expect(result).toContain('[00:00:00.000 --> 00:00:01.234]');
    expect(result).toContain('hello world');
    expect(result).toContain('[00:00:02.000 --> 00:00:03.500]');
  });

  it('throws with invalid json', () => {
    expect(() => jsonToTranscript('not json')).toThrow();
  });
});
