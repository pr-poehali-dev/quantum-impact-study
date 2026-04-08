import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().min(10, "Введите корректный номер"),
});
type FormData = z.infer<typeof schema>;

export default function CallbackDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("https://functions.poehali.dev/c8b5fb8c-4b3a-4b32-8ad4-588cf7db42b7", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, message: "Обратный звонок" }),
      });
      if (!res.ok) throw new Error();
      toast.success("Заявка принята. Перезвоним вам в ближайшее время.");
      reset();
      setOpen(false);
    } catch {
      toast.error("Не удалось отправить заявку. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="inline-block border border-white text-white px-8 py-3 uppercase tracking-wide text-sm font-medium hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
          Обратный звонок
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-md px-8 py-10 shadow-2xl">
          <Dialog.Title className="text-black font-bold text-xl mb-1">
            Обратный звонок
          </Dialog.Title>
          <Dialog.Description className="text-neutral-500 text-sm mb-8">
            Оставьте номер — мы перезвоним в течение 15 минут
          </Dialog.Description>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div>
              <input
                {...register("name")}
                placeholder="Ваше имя"
                className="w-full border-b border-neutral-300 focus:border-black outline-none py-3 text-black placeholder-neutral-400 bg-transparent transition-colors"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input
                {...register("phone")}
                placeholder="Номер телефона"
                type="tel"
                className="w-full border-b border-neutral-300 focus:border-black outline-none py-3 text-black placeholder-neutral-400 bg-transparent transition-colors"
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-black text-white py-4 text-sm uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Отправка..." : "Перезвоните мне"}
            </button>
          </form>

          <Dialog.Close className="absolute top-4 right-4 text-neutral-400 hover:text-black transition-colors text-xl leading-none cursor-pointer">
            ✕
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
