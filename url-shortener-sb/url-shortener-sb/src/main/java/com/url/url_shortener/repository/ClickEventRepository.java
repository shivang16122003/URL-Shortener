package com.url.url_shortener.repository;

import com.url.url_shortener.models.ClickEvent;
import com.url.url_shortener.models.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClickEventRepository extends JpaRepository<ClickEvent,Long> {
    public List<ClickEvent> findByUrlMappingAndClickDateTimeBetween(UrlMapping urlMapping, LocalDateTime startDate, LocalDateTime endDate);
    public List<ClickEvent> findByUrlMappingInAndClickDateTimeBetween(List<UrlMapping> urlMapping, LocalDateTime startDate, LocalDateTime endDate);

}
