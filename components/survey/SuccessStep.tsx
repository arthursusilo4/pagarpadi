import { PaddyIcon } from "../icons/paddy-icon";

export function SuccessStep() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center">
          <PaddyIcon className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Terima Kasih!</h2>
        <p className="text-muted-foreground">
          Jawaban Anda telah berhasil disimpan.
          Data ini akan sangat membantu penelitian kami.
        </p>
      </div>
    </div>
  )
}