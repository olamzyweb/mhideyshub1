"use client";

export default function AdsterraBanner() {
    const adCode = `
    <script type="text/javascript">
      atOptions = {
        'key' : '49a14932f488b0230c7295e73e8d121e',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="https://www.highperformanceformat.com/49a14932f488b0230c7295e73e8d121e/invoke.js"></script>
  `;

    return (
        <div className="flex justify-center my-8 overflow-hidden rounded-xl bg-ink/5 py-4 transition-all" style={{ minHeight: "250px" }}>
            <iframe
                title="Adsterra Ad"
                width="300"
                height="250"
                frameBorder="0"
                scrolling="no"
                srcDoc={`<!DOCTYPE html><html><body style="margin:0;padding:0;">${adCode}</body></html>`}
            />
        </div>
    );
}
