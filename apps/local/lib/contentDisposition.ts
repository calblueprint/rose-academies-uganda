// Build a Content-Disposition header for serving a stored file inline.
//
// File names come from user-uploaded content, so putting one straight into
// `filename="..."` breaks the header: a double quote corrupts the quoted
// string, and any character outside Latin-1 makes the Headers ByteString
// conversion throw, which 500s the file route instead of serving the file. We
// emit an ASCII-only quoted fallback plus an RFC 5987 `filename*` parameter so
// modern clients still get the real UTF-8 name.
export function contentDispositionInline(filename: string): string {
  const asciiFallback = filename
    .replace(/[^\x20-\x7e]/g, "_")
    .replace(/["\\]/g, "_");

  return `inline; filename="${asciiFallback}"; filename*=UTF-8''${encodeRFC5987(filename)}`;
}

function encodeRFC5987(value: string): string {
  // encodeURIComponent covers most attr-chars; the few it leaves (! ' ( ) *)
  // are not valid in an RFC 5987 ext-value, so percent-encode them too.
  return encodeURIComponent(value).replace(
    /['()*!]/g,
    char => "%" + char.charCodeAt(0).toString(16).toUpperCase(),
  );
}
