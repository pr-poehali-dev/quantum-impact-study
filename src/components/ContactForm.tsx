import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("https://functions.poehali.dev/c8b5fb8c-4b3a-4b32-8ad4-588cf7db42b7", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success("Заявка отправлена. Мы свяжемся с вами в ближайшее время.");
      reset();
    } catch {
      toast.error("Не удалось отправить заявку. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-20 sm:py-28 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3">
          Обратная связь
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-10 leading-tight">
          Оставьте заявку — мы свяжемся с вами
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <input
              {...register("name")}
              placeholder="Ваше имя"
              className="w-full border-b border-neutral-300 focus:border-black outline-none py-3 text-black placeholder-neutral-400 bg-transparent transition-colors"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("phone")}
              placeholder="Номер телефона"
              type="tel"
              className="w-full border-b border-neutral-300 focus:border-black outline-none py-3 text-black placeholder-neutral-400 bg-transparent transition-colors"
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <textarea
              {...register("message")}
              placeholder="Сообщение (необязательно)"
              rows={3}
              className="w-full border-b border-neutral-300 focus:border-black outline-none py-3 text-black placeholder-neutral-400 bg-transparent transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 self-start bg-black text-white px-10 py-4 text-sm uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Отправка..." : "Отправить заявку"}
          </button>
        </form>
      </div>
    </section>
  );
}