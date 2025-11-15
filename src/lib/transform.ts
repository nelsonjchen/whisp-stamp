// Transform Replicate incredibly-fast-whisper JSON to timestamped transcript
export function jsonToTranscript(jsonString: string): string {
  let data;
  try {
    data = JSON.parse(jsonString);
  } catch (e) {
    throw new Error('Invalid JSON');
  }
  const chunks = data?.output?.chunks;
  if (!Array.isArray(chunks)) throw new Error('No output.chunks array found');

  return chunks
    .map((chunk: any) => {
      const timestamp = Array.isArray(chunk?.timestamp) ? chunk.timestamp : [0, 0];
      const [start = 0, end = 0] = timestamp;
      const text = (chunk?.text ?? '').toString().trim();
      if (!text) return null;
      return `[${formatTime(Number(start))} --> ${formatTime(Number(end))}]   ${text}`;
    })
    .filter(Boolean)
    .join('\n');
}

function formatTime(seconds: number): string {
  const ms = Math.floor((seconds % 1) * 1000);
  const s = Math.floor(seconds) % 60;
  const m = Math.floor(seconds / 60) % 60;
  const h = Math.floor(seconds / 3600);
  return `${pad(h)}:${pad(m)}:${pad(s)}.${ms.toString().padStart(3, '0')}`;
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}
