// ✅ Cloudflare Pages Functions: 阅读次数统计（含防刷 + 24 小时去重）

export interface Env {
  VIEWS: KVNamespace;
}

interface VisitRecord {
  time: number; // 记录访问时间
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, params, env } = context;
  const slug = params.slug as string;

  if (!slug) {
    return new Response(JSON.stringify({ error: "Missing slug" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ✅ 获取访客 IP（Cloudflare 优先）
  const ip =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("x-forwarded-for") ||
    "unknown";

  // ✅ KV key 命名
  const viewsKey = `views:${slug}`;
  const ipKey = `ip:${slug}:${ip}`;

  const now = Date.now();

  // ✅ 获取上次访问记录（JSON 格式）
  const lastVisitRaw = await env.VIEWS.get(ipKey, { type: "json" });
  const lastVisit = lastVisitRaw as VisitRecord | null;

  // ✅ 防止 5 秒内重复刷新
  if (lastVisit && now - lastVisit.time < 5000) {
    const currentViews = await env.VIEWS.get(viewsKey);
    const views = currentViews ? parseInt(currentViews) : 0;

    return new Response(JSON.stringify({ slug, views }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // ✅ 若超过 24 小时，增加计数并记录
  if (!lastVisit || now - lastVisit.time > 24 * 60 * 60 * 1000) {
    const currentViews = await env.VIEWS.get(viewsKey);
    const views = currentViews ? parseInt(currentViews) + 1 : 1;

    await env.VIEWS.put(viewsKey, views.toString());
    await env.VIEWS.put(ipKey, JSON.stringify({ time: now }), {
      expirationTtl: 86400, // 24小时后过期
    });

    return new Response(JSON.stringify({ slug, views }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // ✅ 若 24 小时内访问过，只返回当前计数
  const currentViews = await env.VIEWS.get(viewsKey);
  const views = currentViews ? parseInt(currentViews) : 0;

  return new Response(JSON.stringify({ slug, views }), {
    headers: { "Content-Type": "application/json" },
  });
};
