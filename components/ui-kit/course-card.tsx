"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Users, ArrowUpRight } from "lucide-react";
import { fluidTransition, focusRing } from "./motion";

export interface CourseCardProps {
  title: string;
  category: string;
  instructor: string;
  thumbnail: string | StaticImageData;
  avatar: string | StaticImageData;
  rating: number;
  enrollment: number;
  href: string;
}

export function CourseCard({
  title,
  category,
  instructor,
  thumbnail,
  avatar,
  rating,
  enrollment,
  href,
}: CourseCardProps) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      whileHover={
        reduced
          ? undefined
          : { y: -6, borderColor: "#bfdbfe", boxShadow: "0 16px 40px rgb(30 58 138 / 0.10)" }
      }
      transition={fluidTransition}
      className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-slate-700 dark:bg-slate-900"
    >
      <Link href={href} className={`block rounded-2xl ${focusRing}`}>
        <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-800">
          <Image
            src={thumbnail}
            alt={`Minh họa bài ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-1 text-xs font-semibold text-blue-800">
            {category}
          </span>
        </div>
        <div className="space-y-5 p-6">
          <h3 className="min-h-14 text-xl font-bold leading-7 text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          <div className="flex h-8 items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <Image src={avatar} alt="" width={32} height={32} className="size-8 rounded-full" />
            {instructor}
          </div>
          <div className="flex min-h-6 flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span
              className="inline-flex items-center gap-1.5"
              aria-label={`Đánh giá ${rating} trên 5 sao`}
            >
              <Star aria-hidden className="size-4 fill-amber-400 text-amber-500" />
              {rating.toLocaleString("vi-VN")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users aria-hidden className="size-4" />
              {enrollment.toLocaleString("vi-VN")} học viên
            </span>
            <ArrowUpRight aria-hidden className="ml-auto size-5 text-blue-600" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
