/*
  Warnings:

  - A unique constraint covering the columns `[adAccountId,campaignId,adGroupId,date]` on the table `AdMetrics` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "AdMetrics_adAccountId_campaignId_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "AdMetrics_adAccountId_campaignId_adGroupId_date_key" ON "AdMetrics"("adAccountId", "campaignId", "adGroupId", "date");
